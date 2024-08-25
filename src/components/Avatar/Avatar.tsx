import React, { useEffect, useState } from 'react';
import { Button, Modal, Upload, UploadFile } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import axios from 'axios';
import { setImgSrcForUpload } from '@redux/profileSlice';
import { ErrorChangeProfile } from '@components/ErrorChangeProfile/ErrorChangeProfile';
import { AvatarProps } from './Avatar.types';
import { DeleteIcon, MobileUploadText, MobileWrapperButton, WrapperImg } from './Avatar.styles';

type FileType = Parameters<never>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const Avatar: React.FC<AvatarProps> = ({ resolution }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [errorMeassage, setErrorMeassage] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const imgSrc = useAppSelector((state) => state.profile.profile?.imgSrc);
    const [imageSrc, setImageSrc] = useState(imgSrc);
    const dispatch = useAppDispatch();
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    useEffect(() => {
        if (imgSrc) {
            setFileList([
                {
                    uid: '-1',
                    name: '',
                    status: 'success',
                    url: imgSrc,
                },
            ]);
        }
    }, [imgSrc]);

    const handleFileUpload = ({ file }: any) => {
        const formData = new FormData();

        formData.append('file', file);
        console.log(file.url);
        const headers = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
        };

        setFileList([]);
        axios
            .post('https://marathon-api.clevertec.ru/upload-image', formData, {
                headers: headers,
                onUploadProgress: (event) => {
                    console.log(event.progress);
                    if (event.progress) {
                        setFileList([
                            {
                                uid: file.uid,
                                name: file.name,
                                status: 'uploading',
                                percent: Math.ceil(event.progress * 100),
                            },
                        ]);
                    }
                },
            })
            .then((response) => {
                console.log(response.data);
                dispatch(
                    setImgSrcForUpload(`https://training-api.clevertec.ru${response.data.url}`),
                );
                setFileList([
                    {
                        uid: '-1',
                        name: file.name,
                        status: 'done',
                        url: `https://training-api.clevertec.ru${response.data.url}`,
                    },
                ]);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);

                setErrorMeassage(error.response.status);
                console.log(error);
                setFileList([
                    {
                        uid: '-5',
                        name: file.name,
                        status: 'error',
                    },
                ]);
            });
    };

    const uploadButton = (
        <button
            data-test-id={imgSrc ? '' : 'profile-avatar'}
            style={{ border: 0, background: 'none' }}
            type='button'
        >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить фото профиля</div>
        </button>
    );

    useEffect(() => {
        const listItems = document.querySelectorAll('.ant-upload-list-item-thumbnail');
        listItems.forEach((item) => {
            if (item.innerHTML === 'Uploading...') {
                item.innerHTML = 'Загрузка';
            }
        });
    }, [fileList]);

    const closeModal = () => {
        setErrorMeassage(0);
        setFileList([]);
    };

    const remove = () => {
        setFileList([]);
        setImageSrc('');
    };

    return (
        <>
            {errorMeassage === 409 ? (
                <ErrorChangeProfile
                    closeModal={closeModal}
                    text='Выберите файл размером меньше 5 МБ.'
                    title='Файл слишком большой'
                />
            ) : (
                ''
            )}
            {imgSrc ? (
                <WrapperImg data-test-id='profile-avatar'>
                    <img style={{ height: '100%' }} src={imgSrc} />
                    <DeleteIcon
                        onClick={remove}
                        style={{ color: 'rgba(140, 140, 140, 1)', fontSize: '16px' }}
                    />
                </WrapperImg>
            ) : (
                <Upload
                    data-test-id='profile-avatar'
                    listType={resolution.width <= 400 ? 'picture' : 'picture-card'}
                    onPreview={handlePreview}
                    progress={{
                        strokeColor: 'rgb(47,84,235)',
                    }}
                    fileList={fileList}
                    customRequest={handleFileUpload}
                    name=''
                    onRemove={remove}
                >
                    {resolution.width <= 400 && fileList.length === 0 ? (
                        <MobileWrapperButton>
                            <MobileUploadText>Загрузить фото профиля:</MobileUploadText>
                            <Button
                                data-test-id='profile-avatar'
                                style={{ height: '100%', width: '147px' }}
                                icon={<UploadOutlined />}
                            >
                                Загрузить
                            </Button>
                        </MobileWrapperButton>
                    ) : fileList.length ? (
                        ''
                    ) : (
                        uploadButton
                    )}
                </Upload>
            )}
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};
