import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu } from "antd";

export default function Header() {
  const router = useRouter();

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} href={"/"}>
          <Image
            src={"/assets/book.svg"}
            alt="Logo"
            width={28}
            height={22}
            priority
          />
        </Link>
        <Menu
          mode="horizontal"
          onClick={handleMenuClick}
          style={{ lineHeight: "64px", flexGrow: 1, marginLeft: "auto" }}
        >
          <Menu.Item key="/atividades/criar">Criar atividades</Menu.Item>
          <Menu.Item key="/atividades/lista">Lista de Atividades</Menu.Item>
        </Menu>
      </nav>
    </header>
  );
}
