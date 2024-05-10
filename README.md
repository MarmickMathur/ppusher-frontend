# Peer to Peer Music Streaming Platform

## Problem
Big music streaming platforms rely on central client servers to host their songs, which incurs high costs and requires constant infrastructure scaling to match user demand.

## Solution
Develop an app that utilizes a peer-to-peer (P2P) file sharing protocol to address these issues and offer an alternative solution.

## Implementation

- **Peer-to-Peer File Sharing Protocol**: Use a P2P file sharing protocol to simplify server infrastructure and distribute file chunks among users, who act as seeds for content delivery.
- **Chunking and Seeding**: Divide files into chunks and distribute them among users, who serve as seeds for distributing chunks upon request.
- **Tracker Server**: Employ a lightweight central server (tracker) to manage peers and track chunk information, ensuring efficient content delivery.
- **AI Model**: Implement an AI model to optimize the protocol by selecting the best seeds for chunk retrieval.

## Tech Stack

- **Frontend**:
  - React
  - Redux
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - Flask

- **Database**:
  - MongoDB

## Basic Workflow

The workflow is divided into three main sets, each handled by a different team member:

1. **UI Development**:
   - Design and develop the user interface (UI) and all frontend components.

2. **Tracker Server**:
   - Develop and manage the tracker server responsible for managing peers and tracking information retrieval.

3. **Peer-to-Peer Code**:
   - Develop the peer-to-peer code responsible for file division and sharing.

## Improvements

1. **Security Considerations**: Ensure robust security measures are implemented to protect user data and prevent unauthorized access.
2. **Scalability**: Implement strategies to ensure the system can scale effectively as the user base grows.
3. **User Experience**: Continuously improve the user experience by gathering feedback and making iterative improvements to the app's design and functionality.
4. **Monitoring and Analytics**: Incorporate monitoring and analytics tools to track system performance, user behavior, and trends.
5. **Community Building**: Foster a community around the app by encouraging user engagement, providing support, and hosting events or challenges.
