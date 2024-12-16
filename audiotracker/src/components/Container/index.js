export const ContainerMain = props => (
    <main className="flex fixed w-full">
      {props.children}
    </main>
  );
  
  export const ContainerSection = props => (
    <section className={`w-[80%] ${props.className}`}>
      {props.children}
    </section>
  );
  
  export const GridLayout = props => (
    <div className={`w-full grid justify-items-center gap-12 px-[80px] ${props.className}`}>
      {props.children}
    </div>
  );