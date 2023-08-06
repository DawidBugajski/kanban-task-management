import { v4 as uuidv4 } from 'uuid';
export const LOGO_DARK_SVG = '/logo-dark.svg';
export const LOGO_LIGHT_SVG = '/logo-light.svg';
export const ICON_SHOW_SIDEBAR_SVG = '/icon-show-sidebar.svg';
export const ICON_HIDE_SIDEBAR_SVG = '/icon-hide-sidebar.svg';
export const ICON_DARK_THEME_SVG = '/icon-dark-theme.svg';
export const ICON_LIGHT_THEME_SVG = '/icon-light-theme.svg';
export const ICON_VERTICAL_ELLIPSIS_SVG = '/icon-vertical-ellipsis.svg';
export const LOGO_MOBILE_SVG = '/logo-mobile.svg';
export const ICON_ADD_TASK_MOBILE_SVG = '/icon-add-task-mobile.svg';
export const ICON_CHEVRON_UP_SVG = 'icon-chevron-up.svg';
export const ICON_CHEVRON_DOWN_SVG = 'icon-chevron-down.svg';

export const STARTING_DATA = {
  boards: [
    {
      name: 'Platform Launch',
      id: uuidv4(),
      columns: [
        {
          name: 'Todo',
          id: uuidv4(),
          tasks: [
            {
              title: 'Build a kanban task management application',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition",
              status: 'Todo',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Delete Task',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title:
                    'Popover button shouldbe refactored to be reusable in header',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Edit Task',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Add Task',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Edit Board',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Delete Board',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Add Board',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Check RWD/small bugs',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Build UI for onboarding flow',
              description: '',
              status: 'Todo',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Sign up page',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Sign in page',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Welcome page',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Build UI for search',
              description: '',
              status: 'Todo',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Search page',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Build settings UI',
              description: '',
              status: 'Todo',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Account page',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Billing page',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'QA and test all major user journeys',
              description:
                'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
              status: 'Todo',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Internal testing',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'External testing',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          id: uuidv4(),
          tasks: [
            {
              title: 'Design settings and search pages',
              description: '',
              status: 'Doing',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Settings - Account page',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Settings - Billing page',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Search page',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Add account management endpoints',
              description: '',
              status: 'Doing',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Upgrade plan',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Cancel plan',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Update payment method',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Design onboarding flow',
              description: '',
              status: 'Doing',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Sign up page',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Sign in page',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Welcome page',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Add search enpoints',
              description: '',
              status: 'Doing',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Add search endpoint',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Define search filters',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Add authentication endpoints',
              description: '',
              status: 'Doing',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Define user model',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Add auth endpoints',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title:
                'Research pricing points of various competitors and trial different business models',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: 'Doing',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Research competitor pricing and business models',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Outline a business model that works for our solution',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title:
                    'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          name: 'Done',
          id: uuidv4(),
          tasks: [
            {
              title: 'Conduct 5 wireframe tests',
              description:
                'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
              status: 'Done',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Complete 5 wireframe prototype tests',
                  id: uuidv4(),
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Create wireframe prototype',
              description:
                'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
              status: 'Done',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Create clickable wireframe prototype in Balsamiq',
                  id: uuidv4(),
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Review results of usability tests and iterate',
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              status: 'Done',
              id: uuidv4(),
              subtasks: [
                {
                  title:
                    'Meet to review notes from previous tests and plan changes',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Make changes to paper prototypes',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Conduct 5 usability tests',
                  id: uuidv4(),
                  isCompleted: true,
                },
              ],
            },
            {
              title:
                'Create paper prototypes and conduct 10 usability tests with potential customers',
              description: '',
              status: 'Done',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Create paper prototypes for version one',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Complete 10 usability tests',
                  id: uuidv4(),
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Market discovery',
              description:
                'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
              status: 'Done',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Interview 10 prospective customers',
                  id: uuidv4(),
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Competitor analysis',
              description: '',
              status: 'Done',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Find direct and indirect competitors',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'SWOT analysis for each competitor',
                  id: uuidv4(),
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Research the market',
              description:
                'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
              status: 'Done',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Write up research analysis',
                  id: uuidv4(),
                  isCompleted: true,
                },
                {
                  title: 'Calculate TAM',
                  id: uuidv4(),
                  isCompleted: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Marketing Plan',
      id: uuidv4(),
      columns: [
        {
          name: 'Todo',
          id: uuidv4(),
          tasks: [
            {
              title: 'Plan Product Hunt launch',
              description: '',
              status: 'Todo',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Find hunter',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Gather assets',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Draft product page',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Notify customers',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Notify network',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Launch!',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Share on Show HN',
              description: '',
              status: '',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Draft out HN post',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Get feedback and refine',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Publish post',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Write launch article to publish on multiple channels',
              description: '',
              status: '',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Write article',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Publish on LinkedIn',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Publish on Inndie Hackers',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Publish on Medium',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          id: uuidv4(),
          tasks: [],
        },
        {
          name: 'Done',
          id: uuidv4(),
          tasks: [],
        },
      ],
    },
    {
      name: 'Roadmap',
      id: uuidv4(),
      columns: [
        {
          name: 'Now',
          id: uuidv4(),
          tasks: [
            {
              title: 'Launch version one',
              description: '',
              status: '',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Launch privately to our waitlist',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Launch publicly on PH, HN, etc.',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Review early feedback and plan next steps for roadmap',
              description:
                "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              status: '',
              id: uuidv4(),
              subtasks: [
                {
                  title: 'Interview 10 customers',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Review common customer pain points and suggestions',
                  id: uuidv4(),
                  isCompleted: false,
                },
                {
                  title: 'Outline next steps for our roadmap',
                  id: uuidv4(),
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          name: 'Next',
          id: uuidv4(),
          tasks: [],
        },
        {
          name: 'Later',
          id: uuidv4(),
          tasks: [],
        },
      ],
    },
  ],
};
