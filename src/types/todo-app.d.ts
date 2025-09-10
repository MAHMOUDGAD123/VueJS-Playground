type Category = '----' | 'Personal' | 'Daily Life' | 'Health' | 'Hobbies' | 'Finance' | 'Planning';

type Todo = {
  id: string;
  title: string;
  category: Category;
  from: string;
  to: string;
  completed: boolean;
};
