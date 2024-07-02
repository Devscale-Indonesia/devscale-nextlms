import { Button } from "../button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div>nextlms.</div>
      <nav className="flex items-center gap-6 font-semibold">
        <div>Courses</div>
        <div>Flash Sale</div>
        <div>About</div>
        <div>Login</div>
        <Button className="w-fit" size="sm">
          Get Started
        </Button>
      </nav>
    </header>
  );
};
