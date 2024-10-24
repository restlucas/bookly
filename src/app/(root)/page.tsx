import { LoginButton } from "@/components/button/login";
import { CommentsCard } from "@/components/card/comments";

export default function Home() {
  return (
    <div className="space-y-32">
      {/* Title and slogan */}
      <section className="grid h-[600px] grid-cols-[40%_60%]">
        <div className="flex items-center justify-center">
          <div className="flex flex-col space-y-8">
            <h1 className="text-5xl font-bold">
              <span className="bg-vibrant-green-100">Facilite</span> seu
              dia-a-dia
            </h1>
            <h3 className="">
              Agende, gerencie e confirme, tudo em um só lugar. Venha fazer
              parte da nossa comunidade e descubra profissionais em sua região!
            </h3>
            <LoginButton />
            <div className="flex items-center justify-start gap-4">
              <div className="flex flex-col items-start justify-start">
                <span className="font-thin uppercase">Agendamentos</span>
                <span className="text-3xl text-vibrant-green-100">1000+</span>
              </div>
              <div className="flex flex-col items-start justify-start">
                <span className="font-thin uppercase">Profissionais</span>
                <span className="text-3xl text-vibrant-green-100">1000+</span>
              </div>
            </div>
          </div>
        </div>
        <aside className="overflow-hidden rounded-3xl bg-[url('/booking.jpg')] bg-cover bg-center bg-no-repeat" />
      </section>

      {/* About the system */}
      <section className="flex h-[400px] w-full items-center justify-center rounded-3xl bg-background-200 p-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-center text-4xl font-bold text-vibrant-green-100">
            Objetivo do sistema
          </h1>
          <h3 className="w-2/4 text-center text-base">
            Projetado para conectar clientes a profissionais de diversas áreas,
            como saúde, beleza e bem-estar, de forma simples e eficiente. Com
            uma interface intuitiva e fácil de usar, os usuários podem agendar
            consultas e serviços em apenas alguns cliques, eliminando a
            necessidade de chamadas telefônicas e longas esperas.
          </h3>
        </div>
      </section>

      {/* Main functionalities */}
      <section className="grid grid-rows-[200px_200px] gap-2">
        <div className="grid grid-cols-[30%_70%] overflow-hidden rounded-md">
          <div className="flex items-center justify-center bg-vibrant-green-100 text-3xl font-bold">
            Para clientes
          </div>
          <div className="grid grid-cols-3 items-center gap-8 bg-background-300 p-4">
            <div className="flex flex-col gap-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                  1
                </div>
                <h5 className="font-bold">Facilidade de uso</h5>
              </div>
              <p className="text-sm text-slate-300">
                Navegue pelas categorias e encontre profissionais qualificados
                em sua área com apenas alguns cliques.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                  2
                </div>
                <h5 className="font-bold">Conveniência</h5>
              </div>
              <p className="text-sm text-slate-300">
                Agende consultas a qualquer hora e de qualquer lugar, sem a
                necessidade de telefonemas ou idas pessoais.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                  3
                </div>
                <h5 className="font-bold">Eficiência</h5>
              </div>
              <p className="text-sm text-slate-300">
                Receba lembretes automáticos sobre suas consultas, evitando
                esquecimentos e otimizando seu tempo.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[70%_30%] overflow-hidden rounded-md">
          <div className="grid grid-cols-3 items-center gap-8 bg-background-300 p-4">
            <div className="flex flex-col gap-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                  1
                </div>
                <h5 className="font-bold">Gerenciamento simplificado</h5>
              </div>
              <p className="text-sm text-slate-300">
                Acesse um painel de controle fácil de usar para gerenciar
                horários, serviços e clientes.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                  2
                </div>
                <h5 className="font-bold">Visibilidade</h5>
              </div>
              <p className="text-sm text-slate-300">
                Aumente sua visibilidade e atraia novos clientes através da
                nossa plataforma, exibindo suas especializações e
                disponibilidade.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                  3
                </div>
                <h5 className="font-bold">Relatórios e estatísticas:</h5>
              </div>
              <p className="text-sm text-slate-300">
                Monitore seu desempenho com relatórios detalhados, ajudando a
                tomar decisões informadas sobre seu negócio.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-vibrant-green-100 text-3xl font-bold">
            Para profissionais
          </div>
        </div>
      </section>

      {/* Comments */}
      <section className="w-full">
        <h1 className="mb-5 text-center text-3xl">
          O que as pessoas pensam{" "}
          <span className="bg-vibrant-green-100 font-bold text-background-300">
            sobre nós
          </span>
        </h1>
        <div className="flex items-center justify-center">
          <div className="grid w-3/4 grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => {
              return <CommentsCard />;
            })}
          </div>
        </div>
      </section>

      {/* Login */}
      {/* Contact and support */}
      {/* Social media */}
    </div>
  );
}
