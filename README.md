Problem:
All the best the big music streaming platforms use central client servers to host their songs while this is a good approach but it has its cons namely cost and infrastructure. Also the servers have to constantly be scaled to match the user base

Solution:
An App that uses a peer to peer file sharing protocol to solve some of the said issues and provide an alternative to the public

Implementation:

    The idea is to use a peer to peer file sharing protocol that enables the app to work on a much simpler and light server.
    The file will be split into chunks and then stored on different clients which
    then serve as seeds to deliver the chunks upon a request.
    A tracker will be used as a lightweight central server to keep track of the chunks.
    Also it will scale itself due to the inherent nature of the protocol.
    An A.I. model will be used to better the functionality of the protocol by choosing the best seed for chunk retrieval.

Tech Stack:

MongoDb
Node
Express
React
Redux
Flask
Tailwind

basic workflow:
we divided the work flow into 3 sets one person is handeling each set.
first set is regarding the ui where the ui and everything realted to fornt end will be handeled

    second set is regarding the tracker server which handles and manages the peers and information retreival

    third set is regarding the actual peer to peer code of the server where the files are divided and shared.
