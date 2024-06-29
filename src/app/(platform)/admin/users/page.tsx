import { UserServices } from "@/services/user.services";

import { BanUser } from "./comp.ban-user";
import { UnbanUser } from "./comp.unban-user";

export default async function User() {
  const users = await UserServices.getAllUsers();

  return (
    <main className="space-y-6 py-12">
      <section className="space-y-1 px-12">
        <h3>Users</h3>
        <p>All users in platform</p>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="rounded-xl border-y border-slate-200 bg-white">
            <tr className="text-left">
              <th className="py-5 pl-12">Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Enrolled Courses</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} className="border-b border-slate-200 bg-white font-medium">
                  <td className="py-5 pl-12">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isVerified ? "VERIFIED" : "UNVERIFIED"}</td>
                  <td>0</td>
                  <td>{user.role}</td>
                  <td>{user.onBanned ? <UnbanUser userId={user.id} /> : <BanUser userId={user.id} />}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
