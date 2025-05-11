export default function SkillCard ({ icon, title, text_info }: { icon: string, title: string, text_info: string }){
    const [iconPrefix, iconClass] = icon.split(' ');

    return (
        <>
            <div className="bg-white min-w-[250px] flex-shrink-0 p-6 rounded-xl shadow-sm tech-card transition duration-300">
                <div className="text-accent text-3xl md:text-4xl mb-4">
                    <i className={`${iconPrefix} ${iconClass}`}></i>
                </div>
                <h3 className="font-bold text-sm md:text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-[10px] text-sm">{text_info}</p>
            </div>
        </>
    );
};