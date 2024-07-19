import React from "react";

import { Card } from "@/components/card";
import { currencyFormat } from "@/libs/currency-format";
import { TransactionServices } from "@/services/transaction.services";
import prisma from "@/utils/prisma";

export default async function Page() {
  const transactions = await TransactionServices.getTransactions();
  const currentRevenues = await TransactionServices.getCurrentRevenues();
  const totalUsers = await prisma.user.count();
  const totalCourses = await prisma.course.count();

  return (
    <main className="space-y-4 py-12">
      <section className="space-y-2 px-12">
        <h3>Analytics</h3>
        <p>Here is all time analytics</p>
      </section>
      <section className="grid grid-cols-3 gap-4 px-12">
        <Card>
          <h2>{currencyFormat(currentRevenues)}</h2>
          <p>Current Revenues</p>
        </Card>
        <Card>
          <h2>{totalUsers}</h2>
          <p>Total Users</p>
        </Card>
        <Card>
          <h2>{totalCourses}</h2>
          <p>Total Course</p>
        </Card>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="py-5 pl-12">Course Title</th>
              <th>Student Name</th>
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
                  <td>{transaction.user.name}</td>
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
