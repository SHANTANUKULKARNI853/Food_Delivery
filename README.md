

# 🍔 Food Delivery App 🚀

Welcome to the **Food Delivery App**! A full-stack application that allows users to browse restaurants, place orders, and manage their cart. Built with **Node.js**, **Express**, **MongoDB**, and **React.js**, this app provides a seamless experience for both users and admins.

## 🌐 Live Demo  
👉 [Visit Live Site]((https://vercel.com/shantanukulkarni853-gmailcoms-projects/food-delivery/HPcuXa5xchf5qeFWMxwti4SWtMrp))

---

## 🌟 Features

- 🔒 **User Authentication**: Secure login and signup functionality for users.
- 🍽️ **Browse Restaurants**: View a list of available restaurants along with ratings, cuisines, and other details.
- 🛒 **View Menu and Order**: Select items from the menu and add them to the cart.
- 🛍️ **Cart Management**: Add, remove, or modify items in the cart.
- ⏱️ **Real-time Updates**: Stay updated with the order status in real-time.
- 📱 **Responsive UI**: Fully responsive design, optimized for both mobile and desktop views.

## 💻 Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Libraries**:
  - 📍 React Router (for routing)
  - 🌐 Axios (for making API requests)
  - 🔒 bcryptjs (for password hashing)
  - 🗃️ mongoose (for MongoDB interactions)

## ⚙️ Installation

### 📍 Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for cloud database)

### ⬇️ Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/SHANTANUKULKARNI853/Food_Delivery.git
cd Food_Delivery
```

### 🔧 Backend Setup

1. Navigate to the `server` folder:

   ```bash
   cd server
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and configure the environment variables (e.g., MongoDB URI, JWT secret):

   ```env
   MONGO_URI=<your-mongo-db-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will be available at `http://localhost:5000`.

### 🌐 Frontend Setup

1. Navigate to the `client` folder:

   ```bash
   cd client
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

## 🛠️ Usage

Once both the frontend and backend servers are running, you can:

1. Visit `http://localhost:3000` in your browser to access the Food Delivery app.
2. Register or log in to browse restaurants, add items to your cart, and place orders.

## 📂 File Structure

```bash
Food_Delivery/
├── client/                  # React.js frontend
│   ├── src/                 
│   ├── public/
│   └── package.json
├── server/                  # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
├── README.md
└── package.json
```

## 🤝 Contributing

We welcome contributions to the Food Delivery app! If you'd like to contribute, please follow these steps:

1. 🍴 Fork the repository.
2. 🌿 Create a new branch (`git checkout -b feature/your-feature`).
3. 📝 Commit your changes (`git commit -am 'Add new feature'`).
4. 🚀 Push to the branch (`git push origin feature/your-feature`).
5. 🔀 Create a new Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all the contributors and open-source libraries that made this project possible. 🎉
