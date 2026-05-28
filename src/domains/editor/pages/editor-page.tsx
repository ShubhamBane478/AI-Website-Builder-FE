export default function EditorPage() {
   return (
      <div className="grid min-h-screen grid-cols-[350px_1fr]">
         <aside className="border-r p-6">
            <h2 className="text-2xl font-bold">Editor</h2>
         </aside>

         <main className="p-10">
            <div className="rounded-2xl border p-10">
               Live Preview
            </div>
         </main>
      </div>
   )
}