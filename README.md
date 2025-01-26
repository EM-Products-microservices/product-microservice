# Products Microservice

This microservice is responsible for managing product data. It handles all CRUD operations related to products and ensures data consistency across the system.

## Getting Started

Follow these steps to clone the repository and run the microservice locally:

1. **Clone the repository:**
  ```bash
  git clone <repository-url>
  cd products-app/products-ms
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Create the `.env` file from the template:**
  ```bash
  cp .env.template .env
  ```

4. **Run Prisma migrations:**
  ```bash
  npx prisma migrate dev
  ```

5. **Start the project:**
  ```bash
  npm run start:dev
  ```

6. **(OPTIONAL) You can find product.sql insert script in prisma/seeders, it contains dummy data to work with on local development**