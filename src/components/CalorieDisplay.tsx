type CalorieDisplayProps = {
	calories: number;
	text: string;
};

export default function CalorieDisplay({
	calories,
	text,
}: CalorieDisplayProps) {
	return (
		<>
			{/* Información de las calorias consumidas */}
			<p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
				<span className="font-black text-6xl text-orange-500">{calories}</span>
				{text}
			</p>
		</>
	);
}
