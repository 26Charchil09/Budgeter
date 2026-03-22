<div align="center">
  <h1> Budgeter</h1>
  <p><strong>A privacy-first, full-stack personal finance tracker built with Next.js and Supabase.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
    <img src="https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?style=flat-square&logo=supabase" />
    <img src="https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=flat-square&logo=tailwind-css" />
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />
  </p>
</div>

---

## Why I Built This

Most personal finance apps either require dangerous third-party bank integrations, cost money, or sell your data. I wanted a finance tracker where **you own everything** — your code, your database, your data.

Budgeter is open-source, self-hostable, and built on a free Supabase backend. Nobody sees your finances but you.

---

## Features

-**Secure Authentication** — Email/password signup and login powered by Supabase Auth, with Row Level Security ensuring complete data isolation between users.
-**Transaction Tracking** — Add, edit, delete, and categorize income and expenses in real time.
-**Budget Management** — Set monthly spending limits per category and visually track your compliance.
-**Financial Overview** — Instant dashboard summary of your total balance, income, and expenses.
-**Search & Filter** — Instantly search through your transaction history.
-**Fully Responsive** — Beautiful on desktop and mobile with a premium glassmorphism dark-mode UI.
-**Privacy First** — All data is stored in your own private Supabase database. No third-party tracking.

---

##Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Database & Auth | [Supabase](https://supabase.com/) (PostgreSQL + RLS) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + Glassmorphism |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/budgeter.git
cd budgeter
npm install
```

### 2. Create a Supabase project
- Go to [Supabase.com](https://supabase.com) and create a free project.
- Navigate to **SQL Editor** and run the schema below to create your tables.

<details>
<summary> Click to expand the Database Schema SQL</summary>

```sql
-- Transactions Table
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  amount numeric not null,
  category text not null,
  type text not null check (type in ('income', 'expense')),
  date date not null default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table transactions enable row level security;
create policy "Users can manage their own transactions." on transactions for all using (auth.uid() = user_id);

-- Budgets Table
create table budgets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  category text not null,
  amount_limit numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, category)
);
alter table budgets enable row level security;
create policy "Users can manage their own budgets." on budgets for all using (auth.uid() = user_id);
```
</details>

### 3. Configure environment variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Deployment

This project is optimised for one-click deployment on **Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

> Remember to add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in the Vercel project settings before deploying.

---

## Project Structure

```
budgeter/
├── app/
│   ├── page.js              # Landing page
│   ├── login/page.jsx       # Login page
│   ├── signup/page.jsx      # Signup page
│   └── dashboard/
│       ├── page.jsx         # Main overview
│       ├── transactions/    # Transaction history
│       ├── budgets/         # Budget management
│       └── settings/        # User settings
├── components/
│   ├── AuthGuard.jsx        # Route protection
│   ├── Navbar.jsx           # Sidebar navigation
│   ├── SummaryCards.jsx     # Financial metric widgets
│   ├── TransactionList.jsx  # Transaction table with edit/delete
│   ├── TransactionForm.jsx  # Add transaction modal
│   └── BudgetCard.jsx       # Budget progress card
└── lib/
    └── supabase.js          # Supabase client singleton
```

---

## Security

- All database rows are protected by **Row Level Security (RLS)** — users can only access their own data.
- Secret keys are stored in `.env.local` which is excluded from Git via `.gitignore`.
- Authentication is handled entirely by Supabase, with no passwords ever stored in the application database.

---

## License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">
  Built with by <a href="https://github.com/YOUR_USERNAME">YOUR_NAME</a>
</div>
