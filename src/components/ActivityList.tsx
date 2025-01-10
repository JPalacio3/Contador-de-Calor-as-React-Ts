import { Activity } from '../types';
import { categories } from '../data/categories';
import { useMemo } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ActivityActions } from '../reducers/activityReducer';

type ActivityListProps = {
	activities: Activity[];
	dispatch: React.Dispatch<ActivityActions>;
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
	const CategoryName = useMemo(
		() => (category: Activity['category']) =>
			categories.map((cat) => (cat.id === category ? cat.name : '')),
		[]
	);

	const isEmptyactivities = useMemo(
		() => activities.length === 0,
		[activities]
	);

	return (
		<>
			<h2 className="text-4xl font-bold text-slate-600 text-center">
				Comida y Actividades
			</h2>
			{isEmptyactivities ? (
				<p className="text-center text-slate-500 mt-10">
					No Hay Actividades Registradas
				</p>
			) : (
				activities.map((activity) => (
					<div
						className="px-5 py-10 bg-white shadow rounded-lg mt-5 flex justify-between hover:shadow-lg"
						key={activity.id}>
						<div className="space-y-2 relative">
							<p
								className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-md ${
									activity.category === 1 ? 'bg-lime-500' : 'bg-blue-500'
								}`}>
								{CategoryName(+activity.category)}
							</p>

							<p className="text-2xl font-bold pt-5">{activity.name}</p>

							<p className="font-black text-3xl text-lime-500">
								{activity.calories} {''}
								<span>Calorias</span>
							</p>
						</div>

						<div className="flex gap-5 items-center">
							<button
								onClick={() =>
									dispatch({
										type: 'set-activeId',
										payload: { id: activity.id },
									})
								}>
								<PencilSquareIcon
									className={`h-8 w-8 text-gray-800 hover:text-yellow-800`}
								/>
							</button>

							<button
								onClick={() =>
									dispatch({
										type: 'delete-activity',
										payload: { id: activity.id },
									})
								}>
								<XCircleIcon
									className={`h-8 w-8 text-red-600 hover:text-red-900`}
								/>
							</button>
						</div>
					</div>
				))
			)}
		</>
	);
};

export default ActivityList;
