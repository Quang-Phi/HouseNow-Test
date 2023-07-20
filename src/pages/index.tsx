import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

const Index = () => {
  const statusTab = ['all', 'pending', 'completed']
  const statusContent: { [key: string]: string[] } = statusTab.reduce(
    (acc, status) => {
      if (status === 'all') {
        acc[status] = ['completed', 'pending']
      } else {
        acc[status] = [status]
      }
      return acc
    },
    {} as { [key: string]: string[] }
  )

  const [statusArr, setStatusArr] = useState(statusContent['all'])
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="flex flex-col gap-10 rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <Tabs.Root className="TabsRoot" defaultValue={statusTab[0]}>
          <Tabs.List
            aria-label="Manage your account"
            className="flex items-center gap-2 self-stretch"
          >
            {statusTab.map((status, tabIndex) => (
              <Tabs.Trigger
                key={tabIndex}
                value={status}
                onClick={() => {
                  setStatusArr(statusContent[status])
                }}
                className="
                      rounded-full 
                      border 
                      border-solid 
                      border-gray-200 
                      px-6 
                      py-3 
                      text-center  
                      text-sm 
                      font-bold 
                      capitalize 
                      text-gray-700
                      data-[state=active]:bg-gray-700 
                      data-[state=active]:text-white"
              >
                {status}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {statusTab.map((status, contentIndex) => (
            <Tabs.Content key={contentIndex} className="" value={status}>
              <div className="pt-10">
                <TodoList statusArr={statusArr} />
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        <div>
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
