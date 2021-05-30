import Link from 'next/Link';

const Manager: React.FC = () => {
  return (
    <div>
      <header>Hello, world!</header>
      <Link href="/manager/new-instructor">
        <a>Gerente</a>
      </Link>
    </div>
  );
};

export default Manager;
