import React, { useState } from 'react';

import { FaPizzaSlice } from 'react-icons/fa';
import { AddTask } from '../AddTask';

export const Header = ({ darkMode, setDarkMode }) => {
    const [shouldShowMain, setShouldShowMain] = useState(false)
    const [showQuickAddTask, setShowQuickAddTask] = useState(false)

    return (
        <header className="header"
            data-testid="header">
            <nav>
                <div className="logo">
                    <img src="/images/open-book.png" alt="Todoist" />
                </div>
                <div className="settings">
                    <ul>
                        <li className="settings__add"
                            data-testid="quick-add-task-action">

                            <button
                                aria-label="Quick Add Task"
                                type="button"
                                onClick={() => {
                                    setShowQuickAddTask(true);
                                    setShouldShowMain(true)
                                }}
                                onKeyDown={() => {
                                    setShowQuickAddTask(true);
                                    setShouldShowMain(true)
                                }}
                            >
                                +
                            </button>
                        </li>
                        <li className="settings__darkmode"
                            data-testid="dark-mode-action">
                            <button
                                aria-label="DarkMode"
                                onClick={() => setDarkMode(!darkMode)}
                                onKeyDown={() => setDarkMode(!darkMode)}
                                type="button"
                            >
                                <FaPizzaSlice />
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <AddTask
                showAddTaskMain={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            />

        </header>
    );
};

