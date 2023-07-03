import { useState, useEffect } from 'react';
import { Ping, ImagesEndpoint } from '../api';
import { FormatDate } from '../utilities';

interface IImage {
  Id: string;
  RepoTags: string;
  Created: number;
}

export default function Images() {
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const status = await Ping();
    if (status == 200) {
      const data = await ImagesEndpoint();
      setImages(data);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-700 to-slate-800 pl-6 pt-6">
      <div className="text-2xl font-bold text-slate-200">Images</div>
      <table className="mt-6 w-full table-fixed text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tag</th>
            <th>Created</th>
          </tr>
        </thead>
        {images.map((image) => (
          <tbody key={image.Id}>
            <tr>
              <td>{image.RepoTags[0].split(':')[0]}</td>
              <td>{image.RepoTags[0].split(':')[1]}</td>
              <td>
                <FormatDate epoch={image.Created} />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
