import { AiOutlinePlus } from 'react-icons/ai'
import { createGroup, features, getGroups, setSelectedGroup } from '@/store/chatSlice'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import group from '@/assets/images/group.png'

function SideNavbar() {


  interface Igroups {
    _id: string
    name: string
    profilePic: string
  }

  const dispatch = useDispatch<AppDispatch>()

  const [groupName, setGroupName] = useState<string | null>(null)

  const { getAllGroups, selectedGroup } = useSelector((state: RootState) => ({
    getAllGroups: state.chatreducer.groups,
    selectedGroup: state.chatreducer.selectedGroup,
  }))


  const newGroup = () => {
    if (groupName) {
      dispatch(createGroup(groupName))
      setGroupName(null)
      window.location.reload()
    }
  }

  useEffect(() => {
    dispatch(getGroups())
  }, [dispatch])



  return (
    <nav className=' rounded-xl max-w-xs bg-bg2  py-2 px-4 text-secondary overflow-hidden flex flex-col items-center '>
      <h1 className='lato-regular'>Groups</h1>
      <div className='  flex  flex-col gap-5 max-h-[60svh] overflow-y-scroll scroll-smooth scrollHide mt-4'>
        {/* group list */}
        {getAllGroups.map((grps: Igroups) => (
          <div key={grps?._id} className='' onClick={() => dispatch(setSelectedGroup(grps._id))}>
            <div className='border-2 rounded-full mx-auto flex  w-12 h-12  p-[1px] mb-1'>
              <img src={grps.profilePic || group} loading="lazy" alt="" className=' object-contain flex m-auto  rounded-full hover:rounded-xl transition-transform ' />
            </div>
            <p className={`text-center hover:bg-[#36353593] rounded-2xl  px-2 lato-regular ${selectedGroup?._id === grps._id ? 'bg-[#36353593]' : ''} `}>{grps.name}</p>
          </div>

        ))}

      </div>
      {/* create group */}
      <div className='border-t-2 mt-3 flex border-[#585656] '>

        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => features('Group chat')} className=' flex m-auto w-12 h-12  rounded-full p-3 object-contain  bg-[#424040] text-[#0bba48]  hover:bg-[#0bba48]  hover:text-white transition-all duration-300 ease-in-out mt-4  '>
              <AiOutlinePlus className='m-auto object-contain' size={26} />
            </Button>
          </DialogTrigger>
          <DialogContent className='bg-[#242425] text-secondary border-0'>
            <DialogHeader>
              <DialogTitle className='lato-bold'>Create Your Group</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  onChange={(e) => setGroupName(e.target.value)}
                  id="name"
                  placeholder='Group Name'
                  className="col-span-3 border lato-regular rounded-sm bg-bg2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={newGroup} className='hover:bg-[#aaa8a8] lato-bold bg-secondary text-primary'>create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  )
}

export default SideNavbar
