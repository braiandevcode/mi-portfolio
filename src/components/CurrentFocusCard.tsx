import { TCurrentFocus } from '../types/types';

export default function CurrentFocusCard(
    {   
        title, 
        subtitle, 
        file_name,
        intro_text, 
        list_item_1,
        list_item_2, 
        list_item_3, 
        list_item_4, 
        list_item_5, 
        closing_text
    }:  Omit<TCurrentFocus, 'id_focus'>
    ) {
    return (
        <>
            <div className="mt-12 bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2"><img alt="Aprendiendo backend" className="rounded-lg shadow-md w-full"
                        src={file_name}/>
                    </div>
                    <div className="md:w-1/2">
                        <h4 className="text-xl font-semibold mb-4">{subtitle}</h4>
                        <p className="text-gray-600 mb-4">{intro_text}:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>{list_item_1}</li>
                            <li>{list_item_2}</li>
                            <li>{list_item_3}</li>
                            <li>{list_item_4}</li>
                            <li>{list_item_5}</li>
                        </ul>
                        <p className="text-gray-600 mt-4">{closing_text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}


