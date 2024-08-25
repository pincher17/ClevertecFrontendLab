import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Registration } from '@pages/Registration/Registration';
import { NotFoundPage } from '@pages/NotFoundPage';
import { Auth } from '@pages/auth/Auth';
import { Calendar } from '@pages/calendar';
import { ChangePassword } from '@pages/change-password/change-password';
import { ConfirmEmail } from '@pages/confirm-email/confirm-email';
import { ErrorChangePassword } from '@pages/error-change-password/error-change-password';
import { ErrorCheckEmailNoExist } from '@pages/error-check-email-no-exist/error-check-email-no-exist';
import { ErrorCheckEmail } from '@pages/error-check-email/error-check-email';
import { ErrorLogin } from '@pages/error-login/error-login';
import { ErrorUserExist } from '@pages/error-user-exist/error-user-exist';
import { Feedbacks } from '@pages/feedbacks';
import { MainPage } from '@pages/main-page';
import { ResultError } from '@pages/result-error/result-error';
import { SuccessChangePassword } from '@pages/success-change-password/success-change-password';
import { SuccessRegistration } from '@pages/success-registration/success-registration';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { ROUTES } from './paths';
import { ProfilePage } from '@pages/profilePage';
import { SettingsPage } from '@pages/settingsPage';
import { TrainingsPage } from '@pages/trainingsPage';
import { AchievementsPage } from '@pages/achievementsPage';



export const AppRoutes = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessTokenQuery = searchParams.get('accessToken');
        if (accessTokenQuery) {
            localStorage.setItem('accessToken', accessTokenQuery);
        }
    }, [searchParams, dispatch]);

    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to={ROUTES.MAIN} />} />
                <Route path={ROUTES.MAIN} element={<MainPage />} />
                <Route path={ROUTES.FEEDBACKS} element={<Feedbacks />} />
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path={ROUTES.REGISTRATION} element={<Registration />} />
                <Route path={ROUTES.ERROR_LOGIN} element={<ErrorLogin />} />
                <Route path={ROUTES.SUCCESS_REGISTRATION} element={<SuccessRegistration />} />
                <Route path={ROUTES.ERROR_USER_EXIST} element={<ErrorUserExist />} />
                <Route path={ROUTES.RESULT_ERROR} element={<ResultError />} />
                <Route path={ROUTES.CONFIRM_EMAIL} element={<ConfirmEmail />} />
                <Route
                    path={ROUTES.ERROR_CHECK_EMAIL_NO_EXIST}
                    element={<ErrorCheckEmailNoExist />}
                />
                <Route path={ROUTES.ERROR_CHECK_EMAIL} element={<ErrorCheckEmail />} />
                <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
                <Route path={ROUTES.SUCCESS_CHANGE_PASSWORD} element={<SuccessChangePassword />} />
                <Route path={ROUTES.ERROR_CHANGE_PASSWORD} element={<ErrorChangePassword />} />
                <Route path={ROUTES.CALENDAR} element={<Calendar />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
                <Route path={ROUTES.TRAININGS} element={<TrainingsPage />} />
                <Route path={ROUTES.ACHIEVEMENTS} element={<AchievementsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};
