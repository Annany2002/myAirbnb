'use client';

interface MenuItemProps {
	onClick: () => void;
	label: string
}

export default function MenuItem({ onClick, label }: MenuItemProps) {
	return (
		<div
			onClick={onClick}
			className='px-4 py-4 transition font-semibold hover:bg-neutral-100'
		>
			{label}
		</div>
	)
}