# Approach and implementation

We started out by focusing on the server implementation. We did this to see if it worked with the given clients since those were presumed to be correctly written, hence great for testing.

For the server implementation, we started out in the main function. This is where we then spawn a process running the server loop and register said process, allowing us to find the id of the process later on.

The server loop simply listens for incoming "NEWPROFILE" messages, containing the profile data. To keep a state of the profiles, we always looped by calling the server function with the updated state. This way, any time the server loops, it has a new profile concatenated to the list of profiles. 

The server function then tries to find matches between the new and existing profiles. It does this in a findMatches function. This function first extracts the information from the new profile. Then it iterates through the existing profiles, and uses their agent and the new agent to check if they are compatible. To avoid PC dependencies, we declassify the booleans of the agents return values. If the agents are compatible, we send a message to both clients, including their matches profile data. When doing this, we used a pini authority clause to get rid of the block label.

As for the client implementation, we started out by setting up all the client information. This includes spawning a client process, which listens for "NEWMATCH" messages, and registering said process. We set all of the clients profile information, including securityLevel, name, yearOfBirth, isFemale (gender), and interests. We collect these in a profile tuple. We then defined an agent function, in our case, for our benign clients, we went for an agent called sameYearAgent, which simply matches with people born in the same year. In this agent, we extract the nescessary information of the matches profile, and compare it to our own. If we are compatible, we create the tuple to send to the server, including the profile data of ours we want to send to the match, raised to the matches security level. We then send this to the server. If we aren't compatible, we simply send a non-match tuple.

We've acquired the id of the server using an alias file, and then a whereis call to get the id of the server process.

# Malicious clients

Our first malicious client, "mal", is a brute force client. It sends new profiles over and over, slightly changing its information, in this case the year of birth, every time it sends a new one. This is done to try to match with as many clients as possible, collecting their information. It avoids matching with its own old profiles. 

Our second malicious client, "malliam"

# Contributions
We did pair programming for a majority of the time, streaming the code to each other and discussing over discord. We took turns doing this, with Lucas streaming the server coding session, and Marcus streaming the client coding session. We got together for a final third session, and did the malicious clients along with the report in the same manner.