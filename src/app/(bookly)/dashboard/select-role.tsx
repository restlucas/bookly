'use client'

import SubmitButton from '@/components/button/submit'
import { SelectInput } from '@/components/input/select'

import { UserContext } from '@/contexts/UserContext'
import { getUserTypes, updateUserRole } from '@/services/userService'
import toastDefaultValues from '@/utils/toast-default-values'
import { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

interface UserTypesProps {
  id: string
  name: string
  slug: string
}

export function SelectRole() {
  const { user, updateRole } = useContext(UserContext)

  const [isLoading, setIsLoading] = useState(false)
  const [userTypes, setUserTypes] = useState<UserTypesProps[]>()
  const [selectedUserType, setSelectedUserType] = useState()

  useEffect(() => {
    const fetchUserTypes = async () => {
      const response = await getUserTypes()
      setUserTypes(response)
    }

    fetchUserTypes()
  }, [])

  async function handleSubmit(event: any) {
    event.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await updateUserRole(user.id, selectedUserType)

    if (response.type === 'success') {
      updateRole(selectedUserType)
    }

    toast[response.type](response.message, toastDefaultValues)
    setIsLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="roleForm"
        className="w-[400px] rounded-md border-2 border-background-200 bg-background-300 p-4"
      >
        <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
          Selecione sua finalidade
        </h2>

        <SelectInput
          label="Tipo de perfil"
          name="userType"
          options={userTypes}
          value={selectedUserType}
          onChange={(e) => setSelectedUserType(e.target.value)}
          required
        />

        <div className="mt-6 flex items-center justify-end">
          <SubmitButton title="Salvar" isLoading={isLoading} />
        </div>
      </form>
      <ToastContainer closeOnClick theme="dark" />
    </>
  )
}
