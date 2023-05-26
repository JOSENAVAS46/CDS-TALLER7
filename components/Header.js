import style from '../styles/header.module.css';

export default function Header() {
    return (
        <>
            <nav className={style.navbar}>
                <a className={style.navbar_brand} href="/#">Inicio</a>
                <a className={style.navbar_brand} href="/categoria">Categoria</a>
                <a className={style.navbar_brand} href="/producto">Producto</a>
                <a className={style.navbar_brand} href="/venta">Venta</a>
                <a className={style.navbar_brand} href="/compra">Compra</a>
                <a className={style.navbar_brand} href="/inventario">Inventario</a>
            </nav>
        </>
    );
}