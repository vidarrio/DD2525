dating-server:
	$(TROUPE)/bin/troupec dating-server.trp -o ./out/dating-server.js
	node $(TROUPE)/rt/built/troupe.js -f=./out/dating-server.js --id=../ids/id-server.json --trustmap=../trustmaps/server.json --aliases=aliases.json

dating-client-alice:
	$(TROUPE)/bin/troupec dating-client-alice.trp -o ./out/dating-client.js
	node $(TROUPE)/rt/built/troupe.js -f=./out/dating-client.js --id=../ids/id-alice.json --trustmap=../trustmaps/client-alice.json --aliases=aliases.json

dating-client-bob:
	$(TROUPE)/bin/troupec dating-client-bob.trp -o ./out/dating-client.js
	node $(TROUPE)/rt/built/troupe.js -f=./out/dating-client.js --id=../ids/id-bob.json --trustmap=../trustmaps/client-bob.json --aliases=aliases.json

dating-client-mal:
	$(TROUPE)/bin/troupec dating-client-mal.trp -o ./out/dating-client.js
	node $(TROUPE)/rt/built/troupe.js -f=./out/dating-client.js --id=../ids/id-mal.json --trustmap=../trustmaps/client-mal.json --aliases=aliases.json

dating-client-malliam:
	$(TROUPE)/bin/troupec dating-client-malliam.trp -o ./out/dating-client.js
	node $(TROUPE)/rt/built/troupe.js -f=./out/dating-client.js --id=../ids/id-malliam.json --trustmap=../trustmaps/client-malliam.json --aliases=aliases.json