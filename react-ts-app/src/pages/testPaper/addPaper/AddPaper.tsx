<<<<<<< HEAD
import React from 'react'

const AddPaper = ()=> {
    return (
        <div>
            AddPaper
        </div>
    );
}


export default AddPaper
=======
import React from 'react'
import style from './AddPaper.module.scss'

const AddPaper: React.FC = () => {
  return (
    <div className={style.addPaper}>
      AddPaper
    </div>
  );
};
export default AddPaper;
>>>>>>> 629e74bf8119f6dec6a6a19187177a4ffdd5d30b
