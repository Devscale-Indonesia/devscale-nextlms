import { Button } from "@/components/button";
import { CertificateServices } from "@/services/certificate.services";

import { approveCertificateAction } from "./action";

export default async function Page() {
  const certificates = await CertificateServices.getAll();

  return (
    <main className="space-y-4">
      <section className="px-12 pt-12">
        <h3>Certificate Approvals</h3>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="rounded-xl border-y border-slate-200 bg-white">
            <tr className="text-left">
              <th className="py-5 pl-12">Course</th>
              <th>User</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => {
              return (
                <tr key={cert.id}>
                  <td className="py-5 pl-12">{cert.course.title}</td>
                  <td>{cert.user.name}</td>
                  <td>{cert.status}</td>
                  <td>
                    <form action={approveCertificateAction}>
                      <input name="certificateId" value={cert.id} type="hidden" required />
                      <Button size="sm" className="w-fit">
                        Approve
                      </Button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
