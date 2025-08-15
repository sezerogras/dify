import AppUnavailable from "@/app/components/base/app-unavailable";
import ChatWrapper from "@/app/components/base/chat/embedded-chatbot/chat-wrapper";
import Header from "@/app/components/base/chat/embedded-chatbot/header";
import Loading from "@/app/components/base/loading";
import DifyLogo from "@/app/components/base/logo/dify-logo";
import LogoHeader from "@/app/components/base/logo/logo-embedded-chat-header";
import { checkOrSetAccessToken } from "@/app/components/share/utils";
import useBreakpoints, { MediaType } from "@/hooks/use-breakpoints";
import useDocumentTitle from "@/hooks/use-document-title";
import cn from "@/utils/classnames";
import { useAsyncEffect } from "ahooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EmbeddedChatbotContext, useEmbeddedChatbotContext } from "./context";
import { useEmbeddedChatbot } from "./hooks";
import { useThemeContext } from "./theme/theme-context";
import { isDify } from "./utils";

const Chatbot = () => {
  const {
    userCanAccess,
    isMobile,
    allowResetChat,
    appInfoError,
    appInfoLoading,
    appData,
    appChatListDataLoading,
    chatShouldReloadKey,
    handleNewConversation,
    themeBuilder,
  } = useEmbeddedChatbotContext();
  const { t } = useTranslation();

  const customConfig = appData?.custom_config;
  const site = appData?.site;

  const difyIcon = <LogoHeader />;

  useEffect(() => {
    themeBuilder?.buildTheme(
      site?.chat_color_theme,
      site?.chat_color_theme_inverted
    );
  }, [site, customConfig, themeBuilder]);

  useDocumentTitle(site?.title || "Chat");

  if (appInfoLoading) {
    return (
      <>
        {!isMobile && <Loading type="app" />}
        {isMobile && (
          <div className={cn("relative")}>
            <div
              className={cn(
                "flex h-[calc(100vh_-_60px)] flex-col rounded-2xl border-[0.5px] border-components-panel-border shadow-xs"
              )}
            >
              <Loading type="app" />
            </div>
          </div>
        )}
      </>
    );
  }

  if (!userCanAccess)
    return <AppUnavailable code={403} unknownReason="no permission." />;

  if (appInfoError) {
    return (
      <>
        {!isMobile && <AppUnavailable />}
        {isMobile && (
          <div className={cn("relative")}>
            <div
              className={cn(
                "flex h-[calc(100vh_-_60px)] flex-col rounded-2xl border border-gray shadow-xs"
              )}
            >
              <AppUnavailable />
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <div className="relative">
      <div
        className={cn(
          "flex flex-col rounded-t-2xl border border-components-panel-border-subtle",
          isMobile ? "h-[calc(100vh_-_60px)] border border-gray" : "h-[100vh]"
        )}
        // style={
        //   isMobile
        //     ? Object.assign(
        //         {},
        //         CssTransform(
        //           themeBuilder?.theme?.backgroundHeaderColorStyle ?? ""
        //         )
        //       )
        //     : {}
        // }
      >
        <Header
          isMobile={isMobile}
          allowResetChat={allowResetChat}
          title={site?.title || ""}
          customerIcon={isDify() ? difyIcon : ""}
          theme={themeBuilder?.theme}
          onCreateNewChat={handleNewConversation}
        />
        <div
          className={cn(
            "flex grow flex-col overflow-y-auto",
            isMobile && "!h-[calc(100vh_-_3rem)]"
          )}
        >
          {appChatListDataLoading && <Loading type="app" />}
          {!appChatListDataLoading && <ChatWrapper key={chatShouldReloadKey} />}
        </div>
      </div>
      {/* powered by */}
      {isMobile && (
        <div className="flex h-[60px] shrink-0 items-center pl-2 border rounded-b-2xl border-components-panel-border">
          {!appData?.custom_config?.remove_webapp_brand && (
            <div className={cn("flex shrink-0 items-center gap-1.5 px-2")}>
              {appData?.custom_config?.replace_webapp_logo && (
                <img
                  src={appData?.custom_config?.replace_webapp_logo}
                  alt="logo"
                  className="block h-5 w-auto"
                />
              )}
              {!appData?.custom_config?.replace_webapp_logo && (
                <DifyLogo size="small" />
              )}
              <div className="text-sm text-black font-normal">
                {t("share.chat.poweredBy")}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const EmbeddedChatbotWrapper = () => {
  const media = useBreakpoints();
  const isMobile = media === MediaType.mobile;
  const themeBuilder = useThemeContext();

  const {
    appInfoError,
    appInfoLoading,
    appData,
    accessMode,
    userCanAccess,
    appParams,
    appMeta,
    appChatListDataLoading,
    currentConversationId,
    currentConversationItem,
    appPrevChatList,
    pinnedConversationList,
    conversationList,
    newConversationInputs,
    newConversationInputsRef,
    handleNewConversationInputsChange,
    inputsForms,
    handleNewConversation,
    handleStartChat,
    handleChangeConversation,
    handleNewConversationCompleted,
    chatShouldReloadKey,
    isInstalledApp,
    allowResetChat,
    appId,
    handleFeedback,
    currentChatInstanceRef,
    clearChatList,
    setClearChatList,
    isResponding,
    setIsResponding,
    currentConversationInputs,
    setCurrentConversationInputs,
    allInputsHidden,
  } = useEmbeddedChatbot();

  return (
    <EmbeddedChatbotContext.Provider
      value={{
        userCanAccess,
        accessMode,
        appInfoError,
        appInfoLoading,
        appData,
        appParams,
        appMeta,
        appChatListDataLoading,
        currentConversationId,
        currentConversationItem,
        appPrevChatList,
        pinnedConversationList,
        conversationList,
        newConversationInputs,
        newConversationInputsRef,
        handleNewConversationInputsChange,
        inputsForms,
        handleNewConversation,
        handleStartChat,
        handleChangeConversation,
        handleNewConversationCompleted,
        chatShouldReloadKey,
        isMobile,
        isInstalledApp,
        allowResetChat,
        appId,
        handleFeedback,
        currentChatInstanceRef,
        themeBuilder,
        clearChatList,
        setClearChatList,
        isResponding,
        setIsResponding,
        currentConversationInputs,
        setCurrentConversationInputs,
        allInputsHidden,
      }}
    >
      <Chatbot />
    </EmbeddedChatbotContext.Provider>
  );
};

const EmbeddedChatbot = () => {
  const [initialized, setInitialized] = useState(false);
  const [appUnavailable, setAppUnavailable] = useState<boolean>(false);
  const [isUnknownReason, setIsUnknownReason] = useState<boolean>(false);

  useAsyncEffect(async () => {
    if (!initialized) {
      try {
        await checkOrSetAccessToken();
      } catch (e: any) {
        if (e.status === 404) {
          setAppUnavailable(true);
        } else {
          setIsUnknownReason(true);
          setAppUnavailable(true);
        }
      }
      setInitialized(true);
    }
  }, []);

  if (!initialized) return null;

  if (appUnavailable)
    return <AppUnavailable isUnknownReason={isUnknownReason} />;

  return <EmbeddedChatbotWrapper />;
};

export default EmbeddedChatbot;
