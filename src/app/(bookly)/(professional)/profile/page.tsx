import { ProfileForm } from "./form";

export default function Profile() {
  return (
    <section className="mb-8">
      <div className="w-full rounded-md bg-background-200 p-8 shadow-md">
        <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
          Perfil profissional
        </h2>

        <ProfileForm />
      </div>
    </section>
  );
}
