import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks]

    const taskExists = updatedTasks.find((task) => task.id === id)

    if (taskExists) {
      taskExists.done = !taskExists.done
    }

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = [...tasks]

    const taskIndex = updatedTasks.findIndex((task) => task.id === id)

    if (taskIndex >= 0) {
      updatedTasks.splice(taskIndex, 1)
      setTasks(updatedTasks)
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
