import React from "react";

import { currencyFormat } from "@/libs/currency-format";
import { TransactionServices } from "@/services/transaction.services";

export default async function Page({ params }: { params: { slug: string } }) {
  const transactions = await TransactionServices.getTransactionsByCourse(params.slug);

  return (
    <main className="space-y-4 py-12">
      <section className="space-y-2 px-12">
        <h3>Course Statistic</h3>
        <p>Here is all time analytics</p>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="py-5 pl-12">Student Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td className="py-5 pl-12">{transaction.user.name}</td>
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
