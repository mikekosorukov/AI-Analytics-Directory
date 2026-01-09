'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function SuggestToolForm({
	setShowSuggest,
}: {
	setShowSuggest: (state: boolean) => void;
}) {
	const [formData, setFormData] = useState({
		tool_name: '',
		description: '',
		website_link: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.tool_name || !formData.description || !formData.website_link)
			return;

		setIsSubmitting(true);

		try {
			const response = await fetch('/api/suggestions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.status === 201) {
				setShowSuggest(false);

				setTimeout(() => {
					toast({
						title: '✅ Tool submitted',
						description: 'Your suggestion has been added successfully!',
					});
				}, 500);
			} else {
				const data = await response.json();
				toast({
					title: '❌ Error',
					description: data.error || 'Failed to submit suggestion',
					variant: 'destructive',
				});
			}
		} catch (error) {
			console.error('Error submitting suggestion:', error);
			toast({
				title: '❌ Error',
				description: 'Failed to submit suggestion',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}

		// reset
		setFormData({ tool_name: '', description: '', website_link: '' });
	};

	return (
		<div className='lg:max-w-md mx-auto bg-[#0f1116] border border-white/10 rounded-2xl shadow-2xl p-8'>
			<h2 className='font-bold text-lg text-white mb-4 drop-shadow-sm'>Suggest a new tool</h2>

			<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
			<Input
				placeholder='Tool name'
				name='tool_name'
				value={formData.tool_name}
				onChange={handleChange}
				className='bg-[#1c1f2a] text-white py-3 border-[#474858] focus:outline-none focus:border-[#6366f1] focus-visible:ring-0 focus-visible:ring-offset-0'
			/>

			<textarea
				placeholder='Why does it belong here?'
				name='description'
				value={formData.description}
				onChange={handleChange}
				className='bg-[#1c1f2a] text-white text-sm placeholder:text-muted-foreground rounded-md p-3 resize-none min-h-[100px] border border-[#474858] focus:outline-none focus:border-[#6366f1]'
			/>

			<Input
				placeholder='Website link'
				name='website_link'
				value={formData.website_link}
				onChange={handleChange}
				className='bg-[#1c1f2a] text-white py-3 border-[#474858] focus:outline-none focus:border-[#6366f1] focus-visible:ring-0 focus-visible:ring-offset-0'
			/>

			<Button
				type='submit'
				disabled={isSubmitting}
				className='bg-[#6366f1] hover:bg-[#4f46e5] text-white border-none shadow-md text-sm font-medium'
			>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</Button>
			</form>
		</div>
	);
}
