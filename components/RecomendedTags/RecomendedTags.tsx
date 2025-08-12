export default function RecommendedTags() {
  const tags = [
    { text: "opiniones", x: "20%", y: "30%" },
    { text: "tarjetas", x: "45%", y: "20%" },
    { text: "política", x: "80%", y: "30%" },
    { text: "estadísticas", x: "55%", y: "50%" },
    { text: "País", x: "30%", y: "60%" },
    { text: "Utilidad", x: "70%", y: "70%" },
    { text: "Educación", x: "20%", y: "80%" },
  ];

  return (
    <div className="relative min-h-[600px] h-auto overflow-hidden bg-background w-full lg:w-1/3">
      <div className="text-center font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2 rounded-full shadow-md inline-block mx-auto mb-8 animate-fade-in">
        Recomendados para ti
      </div>

      {tags.map((tag, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-lg px-4 py-2 shadow-md text-yellow-600 font-bold text-lg transform -translate-x-1/2 -translate-y-1/2 animate-bubble"
          style={{ left: tag.x, top: tag.y }}
        >
          {tag.text}
          {/* <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white shadow-md transform rotate-[35deg]" /> */}
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-background" />
        </div>
      ))}
    </div>
  );
}
