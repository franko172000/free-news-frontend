import { Switch } from '@headlessui/react'
import {useEffect, useState} from "react";
import ContentArea from "components/user/ContentArea";
import {useAppProvider} from "../../hooks/useAppProvider";
import {updatePreference} from "../../services";
import store from "store";
import {AUTH_STORAGE_KEY} from "../../constants";
import {classNames} from "../../helper";
import Button from "../../components/Button";
import {useToast} from "../../hooks/useToast";


export default function Preferences(){
    const {newsProviders, appUser, setAppUser, categories} = useAppProvider()
    const [checkedSources, setCheckedSources] = useState(appUser?.preference?.sources ?? [])
    const [checkedCategories, setCheckedCategories] = useState(appUser?.preference?.categories ?? [])
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newsCategories] = useState(categories);
    const toast = useToast();

    useEffect(()=>{
        setSources(newsProviders)
    },[])

   const setPreference = async (index: number, enabled: boolean) => {
       let updatedList = [...checkedSources]
       const key = Object.keys(sources)[index];
       if(enabled){
           updatedList = [...checkedSources, key]
       }else{
           updatedList.splice(checkedSources.indexOf(key),1)
       }
       setCheckedSources(updatedList);
   }

    const setCategories = async (id: number, enabled: boolean) => {
        let updatedList = [...checkedCategories]
        if(enabled){
            updatedList = [...checkedCategories, id]
        }else{
            updatedList.splice(checkedCategories.indexOf(id),1)
        }
        console.log(updatedList);
        setCheckedCategories(updatedList);
    }
   const isChecked = (index:number): boolean => {
       // @ts-ignore
       return checkedSources.includes(Object.keys(sources)[index])
   }

    const isCheckedCategory = (id:number): boolean => {
        // @ts-ignore
        return checkedCategories.includes(id)
    }

    const handleUpdatePreferences = async () => {
        setLoading(true);
        try{
            await updatePreference({
                categories: checkedCategories,
                sources: checkedSources
            })

            appUser.preference.sources = checkedSources;
            appUser.preference.categories = checkedCategories;
            setAppUser(appUser)
            const stored = store.get(AUTH_STORAGE_KEY);
            stored.user = appUser;
            store.set(AUTH_STORAGE_KEY, stored);

            toast('success',"Preference update was successful!");
        }catch (err){
            console.log(err)
        }
        setLoading(false);
    }
    return (
        <ContentArea title="My Preferences">
            <div className="my-14 flex">
                <div className="w-1/2">
                    <p>Select preferred sources</p>
                    <Switch.Group as="div" className="flex flex-col">
                        {
                            Object.values(sources).map((setting, index)=>(
                                <div className="flex items-center my-5" key={index}>
                                    <Switch
                                        checked={isChecked(index)}
                                        onChange={(enabled)=>setPreference(index, enabled)}
                                        className={classNames(
                                            isChecked(index) ? 'bg-indigo-600' : 'bg-gray-200',
                                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                        )}
                                    >
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            isChecked(index) ? 'translate-x-5' : 'translate-x-0',
                                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                        )}
                                    />
                                    </Switch>
                                    <Switch.Label as="span" className="ml-3 text-sm">
                                        <span className="font-medium text-gray-900">{setting}</span>{' '}
                                    </Switch.Label>
                                </div>
                            ))
                        }
                    </Switch.Group>
                </div>
                <div>
                    <p>Select preferred categories</p>
                    <Switch.Group as="div" className="flex flex-col">
                        {
                            newsCategories.map((category: any, index: number)=>(
                                <div className="flex items-center my-5" key={index}>
                                    <Switch
                                        checked={isCheckedCategory(category.id)}
                                        onChange={(enabled)=>setCategories(category.id, enabled)}
                                        className={classNames(
                                            isCheckedCategory(category.id) ? 'bg-indigo-600' : 'bg-gray-200',
                                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                        )}
                                    >
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            isCheckedCategory(category.id) ? 'translate-x-5' : 'translate-x-0',
                                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                        )}
                                    />
                                    </Switch>
                                    <Switch.Label as="span" className="ml-3 text-sm">
                                        <span className="font-medium text-gray-900">{category.name}</span>{' '}
                                    </Switch.Label>
                                </div>
                            ))
                        }
                    </Switch.Group>
                </div>
            </div>
            <Button title="Update preferences"
                    onClick={handleUpdatePreferences}
                    loading={loading}
                    disabled={loading}
            ></Button>
        </ContentArea>
    )
}