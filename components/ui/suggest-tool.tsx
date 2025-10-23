'use client';

import { useState } from 'react';

import { supabase } from '@/lib/supabaseClient';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function SuggestToolForm() {
	const [formData, setFormData] = useState({
		tool_name: '',
		description: '',
		website_link: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.tool_name || !formData.description || !formData.website_link)
			return;

		const res = await supabase.from('Tool_suggestions').insert(formData);

		if (res?.status === 201) {
			toast({
				title: '✅ Tool submitted',
				description: 'Your suggestion has been added successfully!',
			});
		}

		// reset
		setFormData({ tool_name: '', description: '', website_link: '' });
	};

	return (
		<div className='lg:max-w-md mx-auto bg-[#0f1116] border border-white/10 rounded-2xl shadow-2xl p-8'>
			<h2 className='text-2xl font-bold text-white mb-6'>Suggest an AI Tool</h2>

			<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
				<Input
					placeholder='Tool name'
					name='tool_name'
					value={formData.tool_name}
					onChange={handleChange}
					className='bg-[#1c1f2a] text-white py-3'
				/>

				<textarea
					placeholder='Description'
					name='description'
					value={formData.description}
					onChange={handleChange}
					className='bg-[#1c1f2a] text-white rounded-md p-3 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-indigo-500'
				/>

				<Input
					placeholder='Website link'
					name='website_link'
					value={formData.website_link}
					onChange={handleChange}
					className='bg-[#1c1f2a] text-white py-3'
				/>

				<Button
					type='submit'
					className='bg-indigo-600 hover:bg-indigo-700 py-3 text-lg font-medium'
				>
					Submit
				</Button>
			</form>
		</div>
	);
}
