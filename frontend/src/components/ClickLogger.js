import { useEffect } from "react";
import apiClient from "../api/apiClient";

// Utility function to log custom events
export const logEvent = async (eventName, eventContext, component, description, additionalData = {}) => {
  const accessToken = localStorage.getItem('access');
  if (!accessToken) return;

  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    await apiClient.post("/clickstream/log/", {
      event_context: eventContext,
      component: component,
      event_name: eventName,
      description: description,
      origin: "web",
      metadata: {
        ...additionalData,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userId: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Failed to log event:', error);
  }
};

// Utility function to log page views
export const logPageView = async (pageName, additionalData = {}) => {
  await logEvent(
    "Page View",
    window.location.pathname,
    "Navigation",
    `User viewed page: ${pageName}`,
    additionalData
  );
};

// Utility function to log form interactions
export const logFormInteraction = async (formName, action, additionalData = {}) => {
  await logEvent(
    "Form Interaction",
    window.location.pathname,
    formName,
    `User ${action} form: ${formName}`,
    additionalData
  );
};

// Utility function to log user actions
export const logUserAction = async (action, target, additionalData = {}) => {
  await logEvent(
    "User Action",
    window.location.pathname,
    target,
    `User performed action: ${action}`,
    additionalData
  );
};

// Utility function to log course interactions
export const logCourseInteraction = async (courseName, action, additionalData = {}) => {
  await logEvent(
    "Course Interaction",
    window.location.pathname,
    "Course",
    `User ${action} course: ${courseName}`,
    additionalData
  );
};

export default function useClickLogger(componentName) {
  useEffect(() => {
    const handleClick = (e) => {
      // Get more detailed information about the click
      const target = e.target;
      const targetInfo = {
        tagName: target.tagName,
        className: target.className,
        id: target.id,
        textContent: target.textContent?.substring(0, 100) || '',
        href: target.href || '',
        type: target.type || ''
      };

      // Only log if user is authenticated
      const accessToken = localStorage.getItem('access');
      if (accessToken) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        apiClient.post("/clickstream/log/", {
          event_context: window.location.pathname,
          component: componentName,
          event_name: "Click",
          description: `Clicked ${targetInfo.tagName}${targetInfo.className ? ` with class "${targetInfo.className}"` : ''}${targetInfo.id ? ` with id "${targetInfo.id}"` : ''}`,
          origin: "web",
          metadata: {
            target: targetInfo,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userId: user.id,
            username: user.username
          }
        }).catch(error => {
          console.error('Failed to log clickstream:', error);
        });
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [componentName]);
}
