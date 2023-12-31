'use client';

import Container from '../Container';
import Search from './Search';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { SafeUser } from '@/app/types';
import Categories from './Categories';

interface NavbarProps {
	currentUser?: SafeUser | null
}

export default function Navbar({ currentUser }: NavbarProps) {
	return (
		<div
			className='fixed w-full z-10 shadow-sm bg-white'
		>
			<div
				className='py-4 border-b-[1px]'
			>
				<Container>
					<div
						className='flex flex-row items-center justify-between gap-3 md:gap-0'
					>
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Categories/>
		</div>
	)
}