import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { categories } from '../data/categories';
import { ActivityActions, ActivityState } from '../reducers/activityReducer';
import type { Activity } from '../types';

type FormProps = {
	dispatch: React.Dispatch<ActivityActions>;
	state: ActivityState;
};

const initialState: Activity = {
	id: uuidv4(),
	category: 0,
	name: '',
	calories: '',
};

export default function Form({ dispatch, state }: FormProps) {
	const [activity, setActivity] = useState<Activity>(initialState);

	useEffect(() => {
		if (state.activeId) {
			const selectedActivity = state.activities.filter(
				(stateActivity) => stateActivity.id === state.activeId
			)[0];
			setActivity(selectedActivity);
		}
	}, [state.activeId, state.activities]);

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>
	) => {
		const isNumberField = ['category', 'calories'].includes(e.target.id);

		setActivity({
			...activity,
			[e.target.id]: isNumberField ? +e.target.value : e.target.value,
		});
	};

	const isValidActivity = () => {
		const { category, name, calories } = activity;
		return category !== 0 && name.trim() !== '' && Number(calories) > 0;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({
			type: 'save-activity',
			payload: { newActivity: activity },
		});

		setActivity({ ...initialState, id: uuidv4() });
	};

	return (
		<form
			className="space-y-5 bg-white shadow p-10 rounded-lg"
			onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 gap-3">
				<label htmlFor="category" className="font-bold">
					Categoria:{' '}
				</label>

				<select
					className="border border-slate-300 p-2 rounded-lg w-full bg-white"
					name="category"
					id="category"
					value={activity.category}
					onChange={handleChange}>
					<option value="0" disabled>
						{' '}
						Seleccione
					</option>

					{categories.map((category) => (
						<option value={category.id} key={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div className="grid grid-cols-1 gap-3">
				<label htmlFor="name" className="font-bold">
					Actividad:{' '}
				</label>

				<input
					type="text"
					id="name"
					value={activity.name}
					className="border order-slate-300 p-2 rounded-lg w-full bg-white"
					placeholder="Ej: Comida, Jugo de Naranja, ensalada, Ejercicio, Pesas, Bicicleta ... etc"
					onChange={handleChange}
				/>
			</div>

			<div className="grid grid-cols-1 gap-3">
				<label htmlFor="calories" className="font-bold">
					Calorias:{' '}
				</label>

				<input
					type="number"
					id="calories"
					min={2}
					value={activity.calories}
					className="border order-slate-300 p-2 rounded-lg w-full bg-white"
					placeholder=" Ej: 300, 500, 650 ... etc."
					onChange={handleChange}
				/>
			</div>

			<input
				type="submit"
				className="bg-gray-700 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-10 disabled:cursor-not-allowed disabled:hover:bg-gray-700"
				disabled={!isValidActivity()}
				value={
					activity.category === 0
						? 'Guardar'
						: activity.category === 1
						? 'Guardar Comida'
						: 'Guardar Ejercicio'
				}
			/>
		</form>
	);
}
