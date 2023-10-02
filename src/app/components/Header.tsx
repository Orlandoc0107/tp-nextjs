import ButtonAuth from "./ButtonAuth"
import Link from 'next/link';

const Header1 = () => {
  return (
    <>
      <div>
        <div>
          <ul>
            <li>
              <ButtonAuth />
            </li>
            <li>
              <Link href="/dashboard">
                  <button>Dashboard</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header1