import Backgroudpage from "@/components/Backgroundpage";
import Drawerx from "@/components/Drawerx";
import Keyx from "@/components/Login/Keyx";

export default function Page2() {
  return (
    <>
      <Backgroudpage></Backgroudpage>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Drawerx></Drawerx>
            <Keyx></Keyx>

          </div>

        </main>

      </div>
    </>

  );
}
