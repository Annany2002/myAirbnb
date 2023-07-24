'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useState, useCallback } from 'react';
import MenuItem from './MenuItem';

import useRegisterModal from '../hooks/useRegisterModal';
import useLoginModal from '../hooks/useLoginModal';
import useRentModal from '../hooks/useRentModal';

import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
	currentUser?: SafeUser | null
}

export default function UserMenu({ currentUser }: UserMenuProps) {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);

	return (
		<div
			className='relative'
		>
			<div
				className='flex flex-row items-center gap-3'
			>
				<div
					onClick={onRent}
					className='hidden text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100 md:block'
				>
					Airbnb Your Home
				</div>
				<div
					onClick={toggleOpen}
					className='py-4 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer transition hover:shadow-md md:px-2 md:py-1'
				>
					<AiOutlineMenu />
					<div
						className='hidden md:block'
					>
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{
				isOpen &&
				<div
					className='absolute rounded-xl shadow-md w-[40vw] bg-white overflow-hidden right-0 top-12 text-sm md:w-3/4'
				>
					<div
						className='flex flex-col cursor-pointer'
					>
						{currentUser ? (
							<>
								<MenuItem onClick={() => router.push('/trips')} label='My Trips' />
								<MenuItem onClick={() => router.push('/favorites')} label='My Favourites' />
								<MenuItem onClick={() => router.push('/reservations')} label='My Reservations' />
								<MenuItem onClick={() => router.push('/properties')} label='My Properties' />
								<MenuItem onClick={rentModal.onOpen} label='Airbnb My Home' />
								<MenuItem onClick={() => signOut()} label='Logout' />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label='Login' />
								<MenuItem onClick={registerModal.onOpen} label='Sign Up' />
							</>
						)}
					</div>
				</div>
			}
		</div>
	)
}