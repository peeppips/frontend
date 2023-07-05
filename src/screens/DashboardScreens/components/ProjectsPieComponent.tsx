import { Pie} from '@ant-design/plots';

interface Project {
  // Define the structure of each project object
  // Example properties:
  uid: string;
  name: string;
  // ...
}

const ProjectsPieComponent = ({ projects }: { projects: Project[] }) => {
  const data = [];
  if(projects){
    console.log("pie data is ",projects)
   
    for (let index = 0; index < projects.length; index++) {
      const element = projects[index];
    
      console.log("element is ", element);
    
      // push the object for each element to data array
      data.push({ type: element.name, value: 1 / projects.length });
    }
  }

  
  console.log("data is ", data);


  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
           style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default ProjectsPieComponent;
