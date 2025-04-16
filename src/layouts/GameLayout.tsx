import { Header } from "../components/common/Header/Header.tsx";

export const GameLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <div className="game-container">{children}</div>
    </>
  );
};
