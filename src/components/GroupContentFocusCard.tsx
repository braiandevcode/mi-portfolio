import { useEffect, useState } from "react";
import { TCurrentFocus, TResponseApi } from "../types/types";
import CurrentFocusCard from "./CurrentFocusCard";
import config from '../config/configAPI';
import apiCall from "../helper/helper_query_api";

type Props = {
    onLoaded: () => void;
}

export default function GroupFocusContentCard({ onLoaded}: Props) {
    const [currentFocus, setCurrentFocus] = useState<TCurrentFocus>();
    const [error, setError] = useState<TResponseApi>();
    useEffect(() => {
        const fetchCurrentFocus = async () => {
            try {
                const data: TCurrentFocus[] = await apiCall<TCurrentFocus[]>(config.CURRENT_FOCUS);
                setCurrentFocus(data[0]);
            } catch (err) {
                const newError = err as TResponseApi;
                setError(newError);
            } finally {
                onLoaded?.(); // <- AVISA QUE TERMINÓ
            }
        };

        fetchCurrentFocus();
    }, [onLoaded]);

    return (
        <>
            { error ? (
                <p className="col-span-full text-center text-red-500">Error: {error?.message}</p>
            ) : currentFocus ? (
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
            ) : (
                <p className="col-span-full text-center text-yellow-400">No hay datos de Focus</p>
            )}
        </>
    );
}
