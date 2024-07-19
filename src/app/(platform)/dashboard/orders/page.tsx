import { redirect } from "next/navigation";

import { currencyFormat } from "@/libs/currency-format";
import serverAuth from "@/libs/server-auth";
import { TransactionServices } from "@/services/transaction.services";

export default async function Page() {
  const user = serverAuth();

  if (!user) {
    redirect("/login");
  }

  const transactions = await TransactionServices.getUserTransactions(user.id);

  return (
    <main className="space-y-6 py-12">
      <section className="space-y-1 px-12">
        <h3>Order</h3>
        <p>Order History and Details</p>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="py-5 pl-12">Course Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td className="py-5 pl-12">{transaction.course.title}</td>
                  <td>{currencyFormat(transaction.amount)}</td>
                  <td>{transaction.paymentStatus}</td>
                  <td>{transaction.createdAt.toDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
