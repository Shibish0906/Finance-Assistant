# Finance Assistant

A modern, full-stack personal finance management application built with Next.js, TypeScript, and Convex for real-time financial tracking and analytics.

## Features

- **Transaction Management** - Add, edit, and categorise income and expenses
- **Financial Analytics** - Interactive charts showing cash flow over time and expense breakdowns
- **Smart Categorization** - Organize transactions by custom categories
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Live data synchronisation across all devices
- **Secure Authentication** - User authentication powered by Clerk
- **Dashboard Overview** - Comprehensive financial summary at a glance

## Tech Stack

- **Frontend**: Next.js 15.5.4 with App Router, TypeScript, React 19
- **Styling**: Tailwind CSS with custom UI components
- **Backend**: Convex (real-time database and serverless functions)
- **Authentication**: Clerk for secure user management
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for beautiful icons
- **Animations**: Framer Motion for smooth interactions

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Protected dashboard routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── charts/           # Financial visualization components
│   ├── forms/            # Transaction and auth forms
│   ├── layout/           # Navigation and layout components
│   └── ui/               # Base UI components
├── convex/               # Backend functions and schema
│   ├── functions/        # API functions
│   └── schema.ts         # Database schema
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and constants
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Convex account (for backend)
- Clerk account (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shibish0906/Finance-Assistant.git
   cd Finance-Assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Convex
   CONVEX_DEPLOYMENT=your_convex_deployment_url
   NEXT_PUBLIC_CONVEX_URL=your_convex_url

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Set up Convex backend**

   ```bash
   npx convex dev
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Key Components

### Dashboard

- Financial overview with income, expenses, and balance
- Recent transactions list
- Interactive charts and analytics

### Transaction Management

- Add new income/expense transactions
- Edit existing transactions
- Categorize and organize financial data

### Analytics

- Cashflow over time visualization
- Expense breakdown by category
- Financial trends and insights

## Usage

1. **Sign Up/Login** - Create an account or sign in using Clerk authentication
2. **Add Transactions** - Record your income and expenses
3. **Categorize** - Organize transactions by categories (Food, Transport, etc.)
4. **View Analytics** - Monitor your financial health through interactive charts
5. **Track Progress** - Keep an eye on your spending patterns and financial goals

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy on Other Platforms

This is a standard Next.js application that can be deployed on any platform supporting Node.js:

- Netlify
- Railway
- Digital Ocean
- AWS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Shibish J**

- GitHub: [@Shibish0906](https://github.com/Shibish0906)

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Convex](https://convex.dev/) for real-time backend infrastructure
- [Clerk](https://clerk.dev/) for authentication services
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Recharts](https://recharts.org/) for data visualization

---

If you found this project helpful, please consider giving it a star!
mentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
