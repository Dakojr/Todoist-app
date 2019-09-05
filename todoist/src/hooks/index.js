import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers/index'

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    //give me the task for the selected project
    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', '37pgPazVjDhD2LVjJiRb');

        unsubscribe =
            selectedProject && !collatedTasksExist(selectedProject)
                ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
                : selectedProject === "TODAY"
                    ? (unsubscribe = unsubscribe.where('date',
                        '==',
                        moment().format('DD/MM/YYYY')
                    ))
                    : selectedProject === 'INBOX' || selectedProject === 0
                        ? (unsubscribe = unsubscribe.where('date', '==', ''))
                        : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                        task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                            task.archived !== true
                    )
                    : newTasks.filter(task => task.archived !== true)
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== false));
        });

        return () => unsubscribe();

    }, [selectedProject])

    return { tasks, archivedTasks };
}

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            .where('userId', '==', '37pgPazVjDhD2LVjJiRb')
            .orderBy('projectId')
            .get()
            .then(snapshot => {
                const AllProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId: project.id,
                }));

                if (JSON.stringify(AllProjects) !== JSON.stringify(projects)) {
                    setProjects(AllProjects);
                }
            })
    }, [projects])

    return {projects, setProjects};

}