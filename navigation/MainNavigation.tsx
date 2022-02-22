import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { AddTaskScreen } from '../src/views/MainViews/AddTaskViews/AddTaskView';
import { EmployeesScreen } from '../src/views/MainViews/EmployeesViews/EmployeesView';
import { SettingsScreen } from '../src/views/MainViews/SettingsViews/SettingsView';
import { StatisticsScreen } from '../src/views/MainViews/StatisticsViews/StatisticsView';
import { TasksScreen } from '../src/views/MainViews/TasksViews/TasksView'

const Tabs = createBottomTabNavigator();

export function MainTabs()
{
return(
      <Tabs.Navigator>
        <Tabs.Screen name="Tasks" component={TasksScreen} />
        <Tabs.Screen name="Employees" component={EmployeesScreen} />
        <Tabs.Screen name="AddTask" component={AddTaskScreen} />
        <Tabs.Screen name="Statistics" component={StatisticsScreen} />
        <Tabs.Screen name="Settings" component={SettingsScreen} />
      </Tabs.Navigator>
      )
}