import { AppData } from "../types/types";
import CurrentFocusCard from "./CurrentFocusCard";
import config from '../config/configAPI';

export default function GroupFocusContentCard({ currentFocus }: Pick<AppData, 'currentFocus'>) {
    return (
        <>
            {   currentFocus &&(
                    <CurrentFocusCard
                        key={currentFocus.id_focus}
                        title={currentFocus.title}
                        subtitle={currentFocus.subtitle}
                        file_name={`${config.URL}/uploads/${currentFocus.file_name}`}
                        intro_text={currentFocus.intro_text}
                        list_item_1={currentFocus.list_item_1}
                        list_item_2={currentFocus.list_item_2}
                        list_item_3={currentFocus.list_item_3}
                        list_item_4={currentFocus.list_item_4}
                        list_item_5={currentFocus.list_item_5}
                        closing_text={currentFocus.closing_text}
                    />
                ) 
            }
        </>
    );
}
