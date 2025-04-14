# Report for Lab 2: Web Application Security

## ReDoS
### What is ReDoS?
ReDoS (Regular Expression Denial of Service) is a type of attack that exploits the performance characteristics of regular expressions. We call a regex "vulnerable" if evaluation scales superlinearly with the size of the input. This can happen when the regex engine uses backtracking to match the input against the regex pattern.

For example, consider the regex pattern `^(a+)+$`. If we input a string like `aaaaa...aaaaab`, the regex engine will try to match the string against the pattern by backtracking through all possible combinations of `a` and `b`. In our case, since there are so many combinations to check, the regex engine will take a long time to evaluate the input.

The reason this is especially problematic in node.js is that it's single-threaded. If a regex takes too long to evaluate, it can block the entire event loop, causing the application to become unresponsive, leading to a denial of service.

### Exploit
We've found 3 ReDoS vulnerabilities in the code. The first one is in `forum.js`, where we use the passed search query as a regex pattern. If the used passes a pattern that is vulnerable, it can cause the server to hang, if there are threads with those patterns. Since we pass the pattern to mongodb, and mongodb uses PCRE (Perl Compatible Regular Expressions), which has better handling of backtracking, it doesn't hang our server.

The second one is in our `user.js`, when we register our user. We use the password as a pattern to match against the username to make sure they don't use their username in their password. This is very bad, since a malicious actor can pass a catastrophic regex pattern as a password, and then match against it with a username that is very long, causing the server to hang. This takes a long time on our test computer.

The same exact logic is used when authorising a user in `auth.js`, and so can be exploited there as well.

The parameters we passed were `(a+)+$` as the password, and `aaaaaa...aaaaax` as the username. 

### Mitigation

```js
if (name.match(pass)) {
    req.flash('error', 'Do not include password in name.')
    return res.redirect('back')
}
```

We can mitigate this by using `String.prototype.includes()` instead of `String.prototype.match()`. This will not cause the server to hang, since it doesn't use regex to match the string, but instead uses a simple substring search. 

We can also use a library like `safe-regex` to check if the regex is safe to use. This library checks if the regex is vulnerable to catastrophic backtracking and returns a boolean value. If the regex is not safe, we can return an error message to the user and not use the regex.

```js
if (name.includes(pass)) {
    req.flash('error', 'Do not include password in name.')
    return res.redirect('back')
}
```

As an aside, right now we check if the name includes the password, but we should also check if the password includes the name, since that's very common as well.

## Web Side Channels
### What is a Web Side Channel?
Web side channels are a type of attack that exploits the way web applications handle user input and output. Some of the most common types are timing attacks and storage attacks. Timing attacks exploit the time it takes for a web application to respond to a request, while storage attacks exploit the way web applications store and retrieve data.

### Exploit
In our application, we investigated for storage attacks. In the `park.js` file, we found that if a user knew the registration number of a car, they could try to register it again in any location. If any other user (like the owner of said car) had registered the car in that location, the error message would give it away: "This car is already parked in the selected location. Do not waste your money !". This is a very bad error message, since it gives away the fact that the car is already parked in that location. A malicious actor could use this to their advantage and try to register the car in different locations until they find one that is not already taken.

In a similar way, during user registration, in our `passport.js` file, we found that if a user tried to register with a licence plate that was already taken, the error message would say "License plate already registered by other user". This conveys to the attacker that the licence plate is already registered in the system, and that it belongs to another user. 

### Mitigation
To mitigate the storage attack on the car registration, we change the error message:
```js
req.flash("error", "This car is already parked in the selected location. Do not waste your money !")
```
which gives away both parking status and location, to:
```js
req.flash("error", "This car is already registered in the system. Do not waste your money !")
```
This way, the attacker doesn't know if the car is already parked in the selected location or not.

Alternatively, to also not give away parking status, we can change the error message to a generic one:
```js
req.flash("error", "Unable to complete parking request. Please try again later.")
```

For the user registration, we can change the error message:
```js
return done(null, false, {message: 'License plate already registered by other user'});
```
which gives away the fact that the licence plate is already registered, and that it belongs to another user, to:
```js
return done(null, false, {message: 'License plate already registered in the system'});
```
which doesn't give away that it's by another user, or alternatively, a more generic message:
```js
return done(null, false, {message: 'Unable to complete registration request: invalid licence plate'});
```
This only gives away that it has to do with the licence plate, but not that it's already registered.

These solutions are not perfect, since the same type of exploit still works, but they are much more cryptic about exactly what is going on. To mitigate the exploits completely, larger changes would have to be made, some which would affect the systems functionality. 

We could for example allow duplicate licence plates, and store them as username-licence plate hashes instead. This way we never leak information about other users, but it also opens up the possibility of having multiple users with the same licence plate, which is not ideal.

Another thing is one could implement rate limiting so brute force attacks are not possible. 

To make the system more robust one should also mitigate timing attacks. This can be done by making sure that all requests take the same amount of time to process, regardless of the input. 

## XSS
### What is XSS?
XSS (Cross-Site Scripting) is a type of attack that allows an attacker to inject malicious scripts into web pages viewed by other users. 